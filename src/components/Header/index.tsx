import React, { useState } from "react";
import * as _ from "./style";
import Modal from "./Modal";
import GameModal from "./GameModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import board from "../../assets/group-users.png";
import goods from "../../assets/boxes.png";
import home from "../../assets/home.png";
import game from "../../assets/games.png";

const Header = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isGameModal, setIsGameModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  const userId = localStorage.getItem("id");

  return (
    <_.HeaderWrapper>
      <_.HeaderContainer>
        {isLoggedIn ? (
          <_.HeaderProfileWrapper>
            <_.HeaderProfileName onClick={handleModal}>
              {userId} 님
            </_.HeaderProfileName>
            {isModal ? <Modal /> : null}
          </_.HeaderProfileWrapper>
        ) : (
          <_.HeaderProfileWrapper>
            <_.HeaderAuthWrapper>
              <_.HeaderAuth onClick={handleLogIn}>로그인</_.HeaderAuth>
            </_.HeaderAuthWrapper>
          </_.HeaderProfileWrapper>
        )}

        <_.MenuLine />

        <_.MenuWrapper>
          <b>Menu</b>
          <_.MenuButton
            onClick={() => {
              navigate("/");
            }}
          >
            <_.MenuIcon src={home} />
            메인화면
          </_.MenuButton>

          <_.MenuButton
            onClick={() => {
              navigate("/board");
            }}
          >
            <_.MenuIcon src={board} />
            게시글작성
          </_.MenuButton>
          <_.MenuButton
            onClick={() => {
              navigate("/goods");
            }}
          >
            <_.MenuIcon src={goods} />
            굿즈보기
          </_.MenuButton>

          <_.MenuButton
            onClick={() => {
              setIsGameModal(!isGameModal);
            }}
          >
            <_.MenuIcon src={game} />팬 게임
          </_.MenuButton>
        </_.MenuWrapper>
        {isGameModal ? <GameModal /> : null}
      </_.HeaderContainer>
    </_.HeaderWrapper>
  );
};

export default Header;
