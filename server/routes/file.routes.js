const path = require("path");
const { Router } = require("express");
const config = require("config");
const router = Router();

// Подключаем модуль
let EasyYandexS3 = require("easy-yandex-s3").default;

// Инициализация
let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: config.get("identifikatorClucha"),
    secretAccessKey: config.get("longSecretKey"),
  },
  Bucket: "id-cloudstorage", // например, "my-storage",
  debug: false, // Дебаг в консоли, потом можете удалить в релизе
});

const uploadFile = async () => {
  try {
    let upload = await s3.Upload(
      {
        path: path.resolve(__dirname, "./12323.jpg"),
      },
      "/images/"
    );
    console.log(upload);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { uploadFile };
