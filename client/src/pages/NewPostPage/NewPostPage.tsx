/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useRef, useState } from 'react';
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
// style
import {
  NewPostFrom,
  NewPostImageContainer,
  NewPostCategoryButton,
  NewPostTextarea,
} from './NewPostPageStyles';
// img
import addImgIcon from '../../static/addImgIcon.svg';
import locationIcon from '../../static/locationIcon.svg';

interface NewPostData {
  images: File[];
  content: string;
  category: boolean;
}

const NewPostPage = () => {
  const imgInput = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const userData = useRecoilValue(user);
  const [imgBase64, setImgBase64] = useState<string[]>([]);
  const [post, setPost] = useState<NewPostData>({
    images: [],
    content: '',
    category: false,
  });

  const onChangeImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files)
      Array.from(files).forEach((file) => {
        if (post.images.length < 10)
          setPost((prev) => {
            const newImages = prev.images.concat(file);
            return { ...prev, images: newImages };
          });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) setImgBase64((prev) => [...prev, base64.toString()]);
        };
        reader.readAsDataURL(file);
      });
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPost((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const onClickImageDelBtn = (index: number) => {
    setPost((prev) => {
      const newImages = prev.images.filter((_, idx) => idx !== index);
      return { ...prev, images: newImages };
    });
    setImgBase64((prev) => {
      const newImgBase64 = prev.filter((_, idx) => idx !== index);
      return newImgBase64;
    });
  };

  const onClickSubmitBtn = async () => {
    try {
      const data = await postNewPostInfo(
        userData.userId,
        post.images,
        post.content,
        post.category,
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
    if (post.images.length === 0) return true;
    if (post.content.length === 0) return true;
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
      <NewPostFrom action="" method="POST">
        <label htmlFor="new-post-image">사진을 등록해주라냥</label>
        <input
          id="new-post-image"
          ref={imgInput}
          type="file"
          accept="image/*"
          onChange={onChangeImageFile}
          required
          multiple
          style={{ display: 'none' }}
        />
        <NewPostImageContainer>
          <button
            className="add-btn"
            type="button"
            onClick={() => imgInput.current?.click()}
          >
            <img alt="Add Btn" src={addImgIcon} />
            <p>{imgBase64.length}/10</p>
          </button>
          {imgBase64 &&
            imgBase64.map((image, index) => (
              <ImageSlot
                imgSrc={image}
                index={index}
                onClickFun={onClickImageDelBtn}
              />
            ))}
        </NewPostImageContainer>
        <label htmlFor="new-post-category">이 귀여운 친구는 길고양이냥?</label>
        <input
          id="new-post-category"
          type="checkbox"
          name="category"
          checked={post.category}
          style={{ display: 'none' }}
        />
        <div>
          <NewPostCategoryButton
            checked={post.category}
            type="button"
            onClick={() => setPost((prev) => ({ ...prev, category: true }))}
          >
            네, 맞습니다.
          </NewPostCategoryButton>
          <NewPostCategoryButton
            checked={!post.category}
            type="button"
            onClick={() => setPost((prev) => ({ ...prev, category: false }))}
          >
            아닙니다.
          </NewPostCategoryButton>
        </div>

        {post.category && (
          <>
            <label htmlFor="new-post-location">귀여운 친구의 위치다옹</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <img alt="location" src={locationIcon} />
              <p style={{ margin: '0px' }}>서울 용산구 한강대로 70</p>
            </div>
          </>
        )}
        <label htmlFor="new-post-location">글을 적어달라냥</label>
        <NewPostTextarea
          id="new-post-content"
          name="content"
          placeholder="에옹!"
          onChange={onChangeInput}
        />
      </NewPostFrom>
      <NavBar />
    </>
  );
};

export default NewPostPage;
