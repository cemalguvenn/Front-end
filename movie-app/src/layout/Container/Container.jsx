import React, { useEffect, useState } from "react";
import "./container.css";
import axios from "axios";
import Pagination from "react-responsive-pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Container = () => {
  const [movieList, setMovieList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const api_key = "cb97c1282d2e158e0c8377b5e65dd209";
  const totalPages = 100;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${currentPage}`
      )
      .then((res) => {
        setMovieList(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);
  useEffect(() => {
    if(searchValue){
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchValue}`
      )
      .then((res) => {
        setMovieList(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [searchValue]);

  return (
    <div className="container-fluid p-0 m-0 row d-flex justify-content-center align-items center">
      <input
      className="search"
        type="text"
        placeholder="Ara..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {movieList &&
        movieList.map((item, index) => (
          <div className="card mb-3 p-0 col-md-5 col-sm-12" key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                {loading ? (
                  <Skeleton className="img-skeleton" />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                    className="img-fluid rounded-start"
                    alt={item.title}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {loading ? <Skeleton count={1} /> : item.title}
                  </h5>
                  <p className="card-text">
                    {loading ? <Skeleton count={10} /> : item.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      {!searchValue && (
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
          maxWidth={600}
        />
      )}
    </div>
  );
};

export default Container;
