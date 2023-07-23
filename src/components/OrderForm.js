import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Footer from "./Footer";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    boyut: "",
    hamur: "",
    malzemeler: [],
    siparisNotu: "",
    adet: 1,
  });

  const [formErrs, setFormErrs] = useState({
    boyut: "",
    hamur: "",
    malzemeler: [],
    siparisNotu: "",
    adet: 1,
  });

  const pizzaBilgileri = {
    isim: "Position Absolute Acı Pizza",
    fiyat: 85.5,
    begeni: "4.9",
    begenenSayisi: "(200)",
    text: "Frontent Dev olarak hala position: absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan italyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.",
  };

  const [isValid, setIsValid] = useState(false);

  const ekMalzemeler = [
    "Pepperoni",
    "Domates",
    "Biber",
    "Sosis",
    "Mısır",
    "Sucuk",
    "Kanada Jambonu",
    "Ananas",
    "Tavuk Izgara",
    "Jalepeno",
    "Kabak",
    "Soğan",
    "Sarımsak",
  ];

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        console.log(res.data);
        history.push({
          pathname: "/confirm",
          state: formData,
          pizza: pizzaBilgileri,
        });
        setFormData(e.target.elements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          malzemeler: [...formData.malzemeler, value],
        });
      } else {
        setFormData({
          ...formData,
          malzemeler: formData.malzemeler.filter((item) => item !== value),
        });
      }
    } else {
      Yup.reach(formSchema, name)
        .validate(value)
        .then(() => {
          setFormErrs({ ...formErrs, [name]: "" });
          console.log(formErrs);
        })
        .catch((err) => {
          setFormErrs({ ...formErrs, [name]: err.errors[0] });
        });

      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsValid(valid));
  }, [formData]);

  const formSchema = Yup.object().shape({
    boyut: Yup.string().required("Boyut seçmelisiniz!"),
    hamur: Yup.string().required("Hamur kalınlığı seçmelisiniz!"),
    malzemeler: Yup.array().max(10, "10 malzemeden fazlasını seçemezsiniz."),
    siparisNotu: Yup.string(),
    adet: Yup.number().min(1, "Minimum 1 adet ürün seçmelisiniz."),
  });

  const handleAdetArttir = () => {
    setFormData({
      ...formData,
      adet: formData.adet + 1,
    });
  };

  const handleAdetEksilt = () => {
    setFormData({
      ...formData,
      adet: formData.adet > 1 ? formData.adet - 1 : 1,
    });
  };

  const calculateSelectedItemsTotal = (formData) => {
    const ekMalzemeFiyati = 5;
    const toplam = ekMalzemeFiyati * formData.malzemeler.length;
    return toplam;
  };
  const calculateOrderTotal = (formData) => {
    let result = pizzaBilgileri.fiyat;
    const toplamFiyat =
      (pizzaBilgileri.fiyat + calculateSelectedItemsTotal(formData)) *
      formData.adet;
    if (formData.boyut === "S") {
      result = toplamFiyat;
    } else if (formData.boyut === "M") {
      result = toplamFiyat + 10;
    } else if (formData.boyut === "L") {
      result = toplamFiyat + 20;
    }
    return result;
  };

  const handleRedirectHome = () => {
    history.push("/");
  };

  return (
    <div className="order-page">
      <div className="order-header">
        <h1 onClick={handleRedirectHome}>Teknolojik Yemekler</h1>
      </div>
      <div className="contents">
        <img src={require("../adv-form-banner.png")} alt="" />

        <nav>
          <a href="/" style={{ color: "#5F5F5F" }}>
            Anasayfa
          </a>
          <a href="/orderform" style={{ color: "#5F5F5F" }}>
            {" "}
            - Seçenekler
          </a>
          <a href="/confirm" style={{ color: "#CE2829" }}>
            {" "}
            - Sipariş Oluştur
          </a>
        </nav>

        <h3 style={{ width: "40%", margin: "auto", marginBottom: "3%" }}>
          {pizzaBilgileri.isim}
        </h3>

        <div
          style={{
            width: "40%",
            margin: "auto",
            display: "flex",
            marginBottom: "3%",
          }}
        >
          <h2 style={{ width: "75%" }}>{pizzaBilgileri.fiyat + "₺"}</h2>
          <p style={{ color: "#5F5F5F", width: "15%" }}>
            {pizzaBilgileri.begeni}
          </p>
          <p style={{ color: "#5F5F5F", width: "10%" }}>
            {pizzaBilgileri.begenenSayisi}
          </p>
        </div>

        <p
          style={{
            width: "40%",
            margin: "auto",
            marginBottom: "3%",
            color: "#5F5F5F",
          }}
        >
          {pizzaBilgileri.text}
        </p>
      </div>
      <div className="order-form-container">
        <form id="pizza-form" onSubmit={handleSubmit}>
          <div className="boyut-hamur">
            <div className="pizza-boyutu">
              <h5>
                Boyut Seç<span style={{ color: "#CE2829" }}>*</span>
              </h5>
              <input
                type="radio"
                id="boyut-kucuk"
                name="boyut"
                value="S"
                checked={formData.boyut === "S"}
                onChange={handleChange}
                data-cy="kücük"
                required
              />
              <label style={{ marginTop: "4%" }} htmlFor="boyut-kucuk">
                S
              </label>

              <input
                type="radio"
                id="boyut-orta"
                name="boyut"
                value="M"
                checked={formData.boyut === "M"}
                onChange={handleChange}
                data-cy="orta"
                required
              />
              <label htmlFor="boyut-orta">M</label>

              <input
                type="radio"
                id="boyut-buyuk"
                name="boyut"
                value="L"
                checked={formData.boyut === "L"}
                onChange={handleChange}
                data-cy="buyuk"
                required
              />
              <label htmlFor="boyut-buyuk">L</label>
              <p
                style={{
                  color: "#CE2829",
                  fontSize: "0.8rem",
                  fontFamily: "Quattrocento",
                  margin: "0",
                  marginTop: "2%",
                }}
              >
                {formErrs.boyut}
              </p>
            </div>

            <div className="hamur">
              <h5>
                Hamur Seç<span style={{ color: "#CE2829" }}>*</span>
              </h5>
              <select
                id="hamur"
                name="hamur"
                value={formData.hamur}
                onChange={handleChange}
                data-cy="hamur"
                style={{ marginTop: "4%" }}
                required
              >
                <option value="">Hamur Kalınlığı Seçin</option>
                <option value="INCE">İnce Kenar</option>
                <option value="KALIN">Kalın Kenar</option>
                <option value="STANDART">Standart</option>
              </select>
              <p
                style={{
                  color: "#CE2829",
                  fontSize: "0.8rem",
                  fontFamily: "Quattrocento",
                  margin: "0",
                  marginTop: "2%",
                }}
              >
                {formErrs.hamur}
              </p>
            </div>
          </div>

          <div className="ek-malzemeler">
            <h5 className="baslik">Ek Malzemeler</h5>
            <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
            {ekMalzemeler.map((malzeme, index) => (
              <label className="checkbox" htmlFor={malzeme} key={index}>
                <input
                  className="ek-malzemeler-input"
                  type="checkbox"
                  id={malzeme}
                  name={malzeme}
                  value={malzeme}
                  data-cy="malzemeler"
                  onChange={handleChange}
                  checked={formData.malzemeler.includes(malzeme)}
                  disabled={
                    formData.malzemeler.length >= 10 &&
                    !formData.malzemeler.includes(malzeme)
                  }
                />
                <span class="checkmark"></span>
                {malzeme}
              </label>
            ))}
          </div>

          <div className="siparis-notu">
            <h5>Sipariş Notu</h5>
            <label htmlFor="siparisNotu"></label>
            <input
              type="text"
              id="siparisNotu"
              name="siparisNotu"
              data-cy="note-input"
              value={formData.siparisNotu}
              onChange={handleChange}
              placeholder="Siparişinize eklemek istediğniz bir not var mı?"
            />
          </div>
          <div className="adet-toplam">
            <div className="adet-button">
              <label htmlFor="adet">Adet:</label>
              <button
                type="button"
                onClick={handleAdetEksilt}
                style={{ margin: "0" }}
              >
                -
              </button>
              <input
                type="number"
                id="adet"
                name="adet"
                data-cy="adet"
                value={formData.adet}
                onChange={handleChange}
                min="1"
              />
              <button
                type="button"
                onClick={handleAdetArttir}
                style={{ margin: "0" }}
              >
                +
              </button>
            </div>

            <div className="siparis-tutari">
              <h3>Sipariş Toplamı</h3>
              <div className="fiyat">
                <p> Seçimler:</p>
                <p>{calculateSelectedItemsTotal(formData)} ₺</p>
                <p style={{ color: "#CE2829" }}> Toplam:</p>
                <p style={{ color: "#CE2829" }}>
                  {calculateOrderTotal(formData)} ₺
                </p>
              </div>
              <button
                id="order-button"
                type="submit"
                data-cy="submit-button"
                disabled={!isValid}
                style={{ margin: "0" }}
              >
                Sipariş Ver
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default OrderForm;
