import css from "./App.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { fetchPhotosByQuery } from "./http/http";
import SearchBar from "./SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "./ImageGallery/ImageGallery";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
export default function App() {
  const [articles, setArticles] = useState([]);
  const [modalUrl, setModalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const handleSearch = (topic) => {
    if (topic === "") {
      toast.error("Any search query is required!");
      return;
    }
    setSearchTerm(`${topic}/${Date.now()}`);
    setPage(1);
    setArticles([]);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };
  function openModal(arg) {
    setModalUrl(arg);
    console.log(modalUrl);
  }
  useEffect(() => {
    if (searchTerm === "") {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchPhotosByQuery(searchTerm.split("/")[0], page);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data.results];
        });
        console.log(data.results);
      } catch {
        setError(true);
        toast.error("Please reload there was an error!!!!");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [page, searchTerm]);

  return (
    <div className={css.mainApp}>
      <SearchBar onSearch={handleSearch}></SearchBar>

      <ImageGallery openModal={openModal} items={articles}></ImageGallery>

      {articles.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMoreClick}></LoadMoreBtn>
      )}
      {modalUrl != "" && (
        <ImageModal modalUrl={modalUrl} setModalUrl={setModalUrl}></ImageModal>
      )}
      {error && <ErrorMessage></ErrorMessage>}
      <Toaster position="top-center" reverseOrder={false} />
      <ClipLoader
        loading={isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
