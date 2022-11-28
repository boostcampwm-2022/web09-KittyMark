/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// component
import TopBar from '../../components/TopBar/TopBar';
import NavBar from '../../components/NavBar/NavBar';
import ImageSlot from '../../components/ImageSlot/ImageSlot';
// recoil
import user from '../../store/userAtom';
// api
import postNewPostInfo from '../../apis/api/newPostApi';
// hook
import useImages from '../../hooks/useImages';
import useInputs from '../../hooks/useInputs';
// style
import S from './NewPostPageStyles';
// img
import addImgIcon from '../../static/addImgIcon.svg';
import locationIcon from '../../static/locationIcon.svg';

interface PostData {
  content: string;
  category: boolean;
}

const NewPostPage = () => {
  const imgInput = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const userData = useRecoilValue(user);
  const { images, onChangeImage, onDeleteImage } = useImages({
    images: [],
    image64: [],
  });
  const { form, onChangeForm, setForm } = useInputs<PostData>({
    content: '',
    category: false,
  });

  const onClickSubmitBtn = async () => {
    try {
      const data = await postNewPostInfo(
        userData.userId,
        images.images,
        form.content,
        form.category,
      );
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
    return false;
  };

  return (
    <>
      <TopBar
        isBack
        isCheck
        title="새 게시글"
        backFunc={() => navigation(-1)}
        checkFunc={onClickSubmitBtn}
        checkDisableFunc={disableBtn}
      />
      <S.Form action="" method="POST">
        <label htmlFor="new-post-image">사진을 등록해주라냥</label>
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
        <label htmlFor="new-post-category">이 귀여운 친구는 길고양이냥?</label>
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
            onClick={() => setForm((prev) => ({ ...prev, category: true }))}
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
            <label htmlFor="new-post-location">귀여운 친구의 위치다옹</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <img alt="location" src={locationIcon} />
              <p style={{ margin: '0px' }}>서울 용산구 한강대로 70</p>
            </div>
          </>
        )}
        <label htmlFor="new-post-location">글을 적어달라냥</label>
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
