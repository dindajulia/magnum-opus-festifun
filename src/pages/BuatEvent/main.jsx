// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpload from './components/fileupload';
import Description from './components/deskripsi';
import { Button, Alert } from 'react-bootstrap';







function BuatEvent() {
  const [eventData, setEventData] = useState({
    name: '',
    image: '',
    dateStart: '',
    dateEnd: '',
    location: '',
    categoryIDs: [],
    description: '',
    price: '',
    stock: '',
  });

  const [creationStatus, setCreationStatus] = useState({
    isSuccess: null,
    message: '',
  });


  const handleImageUpload = async (images, setEventData) => {
  try {
    if (!images || images.length === 0) {
      console.error('Tidak ada gambar yang dipilih untuk diunggah');
      return;
    }

    const imageFile = images[0];
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await axios.post('http://localhost:4000/upload', formData);
    const imageLink = response.data.link;

    // Gunakan imageLink di sini jika diperlukan
    console.log('Link gambar:', imageLink);

    // Perbarui state dengan tautan gambar
    setEventData((prevData) => ({ ...prevData, image: imageLink }));
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setEventData((prevData) => ({ ...prevData, categoryIDs: selectedCategories }));
  };

  const handleDescriptionChange = (value) => {
    setEventData((prevData) => ({ ...prevData, description: value }));
  };


  // Fungsi untuk menangani pengunggahan gambar
  // const handleImageUpload = (image) => {
  //   setEventData((prevData) => ({ ...prevData, image: image }));
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi input
    if (!eventData.name || !eventData.location || !eventData.categoryIDs.length || !eventData.dateStart || !eventData.dateEnd) {
      setCreationStatus({
        isSuccess: false,
        message: 'Semua kolom harus diisi.',
      });
      return;
    }
  
    try {
      // Pastikan price dan stock memiliki nilai default atau diisi pada formulir
      const dataToSend = {
        ...eventData,
        price: eventData.price || 0,
        stock: eventData.stock || 0,
      };
      

      await handleImageUpload(eventData.image, setEventData);

    // Once the image is uploaded, proceed with form submission

      // Kirim permintaan ke server menggunakan Axios
      const response = await axios.post('http://localhost:4000/events', {
        ...dataToSend,
        dateStart: dataToSend.dateStart || null,
        dateEnd: dataToSend.dateEnd || null,
      });
  
      // Tampilkan respons dari server
      console.log(response.data);
  


      // Reset form setelah berhasil membuat event
      setEventData({
        name: '',
        image: '',
        dateStart: '',
        dateEnd: '',
        location: '',
        categoryIDs: [],
        description: '',
        price: '',
        stock: '',
      });
  
      // Tampilkan alert sukses
      setCreationStatus({
        isSuccess: true,
        message: 'Event berhasil dibuat!',
      });
    } catch (error) {
      // Tangani kesalahan
      console.error('Error creating event:', error.response?.data || error.message);
  
      // Tampilkan alert error
      setCreationStatus({
        isSuccess: false,
        message: 'Gagal membuat event. Silakan coba lagi.',
      });
    }
  };
  




  return (
    <div className='container'>
      <div className="row">
        <div className="col-sm-5">
        <FileUpload onUpload={(images) => handleImageUpload(images, setEventData)} />
        </div>
        <div className="col-sm-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nama Event</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama event kamu"
              />
            </div>
            <div className="row h-auto">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="date-start" className="form-label">Tanggal Mulai</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date-start"
                    name="dateStart"
                    value={eventData.dateStart}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="date-end" className="form-label">Tanggal Selesai</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date-end"
                    name="dateEnd"
                    value={eventData.dateEnd}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Lokasi</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                placeholder="Masukkan lokasi event kamu"
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="category" className="form-label">Jenis Event</label>
              <select
                className="form-select"
                aria-label="Default select example"
                id='category'
                name="category"
                value={eventData.category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>Pilih Jenis Event</option>
                <option value={1}>Festival</option>
                <option value={2}>Konser Musik</option>
                <option value={3}>pameran</option>
                <option value={4}>Lomba dan Kompetisi</option>
                <option value={5}>Segera hadir</option>
                <option value={6}>Rekomendasi</option>
              </select>
            </div>
            <div>
              <Description value={eventData.description} onChange={handleDescriptionChange} />

            </div> <br /> <br />
            <div className='container'>
              <div className="row border border-1 align-items-center my-3 py-2 d-flex">
                <div className="col-auto">
                  <label htmlFor="inputHarga" className="col-form-label text-secondary">Harga</label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    id="inputHarga"
                    className="form-control"
                    aria-describedby="hargaHelpInline"
                    name="price"
                    value={eventData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="inputJumlah" className="col-form-label text-secondary">Jumlah Tiket</label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    id="inputJumlah"
                    className="form-control"
                    aria-describedby="jumlahHelpInline"
                    name="stock"
                    value={eventData.stock}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

            </div>
            <div className='d-flex justify-content-end gap-3 my-5'>
              <Button variant="danger">Batalkan</Button>
              <Button type="submit" style={{ background: '#1250A2' }}>Buat Event</Button>
            </div>

            {creationStatus.isSuccess !== null && (
              <Alert variant={creationStatus.isSuccess ? 'success' : 'danger'} className="mt-3">
                {creationStatus.message}
              </Alert>
            )}

          </form>
        </div>
      </div>

    </div>
  );
}

export default BuatEvent;
