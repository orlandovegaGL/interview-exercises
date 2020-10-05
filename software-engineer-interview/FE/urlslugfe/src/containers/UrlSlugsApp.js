import React, { useEffect, useState } from 'react';
import { createUrlSlugs, fetchExistentUrlSlugs } from '../api/urlSlugsApi';
import UrlSlugsForm from './UrlSlugsForm';
import UrlSlugsTable from './UrlSlugsTable';
import './UrlSlugsApp.css'

const redirectUrl = process.env.REACT_APP_API_URI + "/slugRedirect/";

const UrlSlugsApp = () => {
    const [data, setData] = useState([]);
    const [loadingCount, setLoadingCount] = useState(0);
    const [fetchDataErrors, setFetchDataErrors] = useState([]);
    const [createDataErrors, setCreateDataErrors] = useState([]);

    const asyncGetHandler = loadedData => {
        setData([
            ...data,
            ...loadedData.map(({description, slug}) => [
                description,
                { url: redirectUrl + slug, label: slug }
            ])
        ]);
        setLoadingCount(loadingCount - 1);
    };

    const asyncGetErrorHandler = errorMessage => {
        setFetchDataErrors([...fetchDataErrors, errorMessage]);
        setLoadingCount(loadingCount - 1);
    };

    const submitHandler = formData => {
        createUrlSlugs(
            formData,
            createdData => {
                asyncPostHandler({
                    ...createdData,
                    description: formData.description
                });
            },
            asyncPostErrorHandler
        );
        setLoadingCount(loadingCount + 1);
    };

    const asyncPostHandler = newData => {
        setData([
            ...data,
            [
                newData.description,
                { url: redirectUrl + newData.slug, label: newData.slug }
            ]
        ]);
        setLoadingCount(loadingCount - 1);
    };

    const asyncPostErrorHandler = errorMessage => {
        setCreateDataErrors([...createDataErrors, errorMessage]);
        setLoadingCount(loadingCount - 1);
    };

    useEffect(() => {
        setLoadingCount(loadingCount + 1);
        fetchExistentUrlSlugs(asyncGetHandler, asyncGetErrorHandler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return  <>
                <h1 className="title">URL SLUGS APP</h1>

                <UrlSlugsForm submitHandler={submitHandler} />
                {
                    createDataErrors.length === 0 ? null :
                    <div className="errorsList">
                        <h3>Creation data errors</h3>
                        <ol>
                        {
                            createDataErrors.map(
                                (errorMessage, index) =>
                                    <li key={"createError" + index}>Error {index + 1}: {errorMessage}</li>
                            )
                        }
                        </ol>
                    </div>
                }
                {
                    loadingCount === 0 ?
                        <div className="loading" /> :
                        <>
                            <UrlSlugsTable data={data} />
                            {
                                fetchDataErrors.length === 0 ? null :
                                <div className="errorsList">
                                    <h3>Fetching data errors</h3>
                                    <ol>
                                    {
                                        fetchDataErrors.map(
                                            (errorMessage, index) =>
                                                <li key={"fetchError" + index}>Error {index + 1}: {errorMessage}</li>
                                        )
                                    }
                                    </ol>
                                </div>
                            }
                        </>
                }
            </>;
}

export default UrlSlugsApp;