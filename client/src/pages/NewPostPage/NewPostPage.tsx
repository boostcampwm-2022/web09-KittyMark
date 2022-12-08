/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// component
import TopBar from '../../components/TopBar/TopBar';
import NavBar from '../../components/NavBar/NavBar';
import ImageSlot from '../../components/ImageSlot/ImageSlot';
import SetLocationModal from '../../components/SetLocationModal/SetLocationModal';
// recoil
import user from '../../store/userAtom';
// api
import { postNewPostInfo, NewPostBody } from '../../apis/api/newPostApi';
import getlocationData from '../../apis/services/reverseGeocodingService';
// hook
import useImages from '../../hooks/useImages';
import useInputs from '../../hooks/useInputs';
import useCurrentLocation from '../../hooks/useCurrentLocation';
// style
import S from './NewPostPageStyles';
// img
import addImgIcon from '../../static/addImgIcon.svg';
import locationIcon from '../../static/locationIcon.svg';
import mapIcon from '../../static/mapButton.png';

interface PostData {
  content: string;
  category: boolean;
}

const NewPostPage = () => {
  const imgInput = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const currentLocation = useCurrentLocation();

  const userData = useRecoilValue(user);
  const { images, onChangeImage, onDeleteImage } = useImages({
    images: [],
    image64: [],
  });
  const { form, onChangeForm, setForm } = useInputs<PostData>({
    content: '',
    category: false,
  });
  const [location, setLocation] = useState<{
    isChecked: boolean;
    latitude?: number;
    longitude?: number;
    location?: string;
  }>({ isChecked: false });
  const [modal, setModal] = useState(false);

  // TODO 안눌렀을 경우 체크
  const findLocation = async () => {
    if (location.isChecked) return;

    const { latitude, longitude } = currentLocation;
    try {
      const reverseGeo = await getlocationData(latitude, longitude);
      setLocation({
        isChecked: true,
        latitude,
        longitude,
        location: reverseGeo,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onClickSubmitBtn = async () => {
    const bodyData: NewPostBody = {
      userId: userData.userId,
      images: images.images,
      content: form.content,
      isStreet: form.category,
    };
    if (form.category && location.isChecked) {
      bodyData.location = location.location;
      bodyData.latitude = location.latitude;
      bodyData.longitude = location.longitude;
    }
    try {
      const data = await postNewPostInfo(bodyData);
      if (data.statusCode === 201) navigation('/home');
      // eslint-disable-next-line no-alert
      else alert(data.message);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const disableBtn = () => {
    if (images.images.length === 0) return true;
    if (form.content.length === 0) return true;
    if (form.category && !location.isChecked) return true;
    return false;
  };

  const viewSetLocationModal = () => {
    setModal(true);
  };

  return (
    <>
      {modal ? (
        <SetLocationModal
          setModal={setModal}
          location={location}
          setLocation={setLocation}
        />
      ) : null}
      <TopBar
        isBack
        isCheck
        title="새 게시글"
        backFunc={() => navigation(-1)}
        checkFunc={onClickSubmitBtn}
        checkDisableFunc={disableBtn}
      />
      <S.Form action="" method="POST">
        <label htmlFor="new-post-image">사진을 등록해주세요.</label>
        <input
          id="new-post-image"
          ref={imgInput}
          type="file"
          accept="image/*"
          onChange={onChangeImage}
          required
          multiple
          style={{ display: 'none' }}
        />
        <S.ImageContainer>
          <button
            className="add-btn"
            type="button"
            onClick={() => imgInput.current?.click()}
          >
            <img alt="Add Btn" src={addImgIcon} />
            <p>{images.image64.length}/10</p>
          </button>
          {images.image64 &&
            images.image64.map((image, index) => (
              <ImageSlot
                key={image}
                imgSrc={image}
                index={index}
                onClickFun={onDeleteImage}
              />
            ))}
        </S.ImageContainer>
        <label htmlFor="new-post-category">
          이 포스트는 길고양이에 관련된 것입니까?
        </label>
        <input
          id="new-post-category"
          type="checkbox"
          name="category"
          checked={form.category}
          style={{ display: 'none' }}
          readOnly
        />
        <div>
          <S.CategoryButton
            checked={form.category}
            type="button"
            onClick={() => {
              setForm((prev) => ({ ...prev, category: true }));
              findLocation();
            }}
          >
            네, 맞습니다.
          </S.CategoryButton>
          <S.CategoryButton
            checked={!form.category}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, category: false }))}
          >
            아닙니다.
          </S.CategoryButton>
        </div>

        {form.category && (
          <>
            <label htmlFor="new-post-location">현재 당신의 위치입니다.</label>
            <div
              style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '70%',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}
              >
                <img alt="location" src={locationIcon} />
                <p style={{ margin: '0px' }}>
                  {location.location || 'Loading...'}
                </p>
              </div>
              {location.location ? (
                <button
                  type="button"
                  onClick={viewSetLocationModal}
                  style={{
                    padding: '0',
                    width: '2rem',
                    height: '2rem',
                    border: '0',
                    backgroundColor: 'transparent',
                  }}
                >
                  <img
                    src={mapIcon}
                    alt="set location"
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                    }}
                  />
                </button>
              ) : null}
            </div>
          </>
        )}
        <label htmlFor="new-post-location">내용을 입력해주세요.</label>
        <S.Textarea
          id="new-post-content"
          name="content"
          placeholder="에옹!"
          onChange={onChangeForm}
        />
      </S.Form>
      <NavBar />
    </>
  );
};

export default NewPostPage;
