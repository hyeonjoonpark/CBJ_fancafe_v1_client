import React, { useState, ChangeEvent, FormEvent } from "react";
import * as _ from "./style";
import Header from "../../Header";
import axiosInstance from "../../../axios";
import axios from "axios";

export default function GoodsUpload(): JSX.Element {
  const [goodsName, setGoodsName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const id: string | null = localStorage.getItem("id");

  const handleGoodsNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGoodsName(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://115.140.87.3:8080/api/goods/upload",
        {
          goodsName: goodsName,
          price: price,
          sellerId: id,
        }
      );

      console.log(response);
      window.location.replace("/goods");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <_.GoodsUploadWrapper>
        <Header />
        <_.GoodsUploadContainer>
          <_.GoodsUploadLink>Menu 〉 굿즈 〉 상품등록</_.GoodsUploadLink>
          <_.GoodsUploadTitle>굿즈 등록</_.GoodsUploadTitle>

          <_.GoodsUploadListWrapper>
            <_.GoodsUploadForm onSubmit={handleFormSubmit}>
              <_.GoodsUploadInputContainer>
                <label htmlFor="goodsName">상품이름:</label>
                <_.GoodsUploadInput
                  type="text"
                  id="goodsName"
                  value={goodsName}
                  onChange={handleGoodsNameChange}
                />
              </_.GoodsUploadInputContainer>

              <_.GoodsUploadInputContainer>
                <label htmlFor="price">상품가격:</label>
                <_.GoodsUploadInput
                  type="text"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </_.GoodsUploadInputContainer>

              <_.GoodsUploadInputContainer>
                <label htmlFor="sellerId">등록자명:</label>
                <_.GoodsUploadInput
                  type="text"
                  id="sellerId"
                  value={id || "로그인 후 이용해주세요"}
                  readOnly
                />
              </_.GoodsUploadInputContainer>

              <_.GoodsUploadBtn type="submit">등록</_.GoodsUploadBtn>
            </_.GoodsUploadForm>
          </_.GoodsUploadListWrapper>
        </_.GoodsUploadContainer>
      </_.GoodsUploadWrapper>
    </div>
  );
}
