import React, {useEffect, useState} from "react";
import axios from 'axios';
import {makeStyles} from "@material-ui/core";

const LOCAL_STORAGE_KEY_PREFIX='Quran:';

export default function Page({url, nextUrl, clzName}) {
    let localStorageUrl = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX+url);
    const [dataAvailable, setDataAvailable] = useState(localStorageUrl !== null);

    let localStorageNextUrl = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX+nextUrl);
    const [nextDataAvailable, setNextDataAvailable] = useState(localStorageNextUrl!==null);

    const useStyles = makeStyles((theme) => ({
        loader: {
            marginTop: 200,
        }
    }));

    const classes = useStyles();

    useEffect(()=>{
        if (dataAvailable && !nextDataAvailable && nextUrl) {
            console.log("getting nextUrl:" + nextUrl);
            axios.get(nextUrl)
                .then(res => {
                    console.log('completed');
                    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX+nextUrl, "1");
                    setNextDataAvailable(() => true);
                })
                .catch(error => {
                    console.log("error = " + error);
                    let errorMsg = error;
                    if (error.response) {
                        console.log(error.response.data);
                        if (error.response.data.error) {
                            errorMsg = error.response.data.error;
                        }
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        console.log(errorMsg);
                    }
                })
                .finally(()=>{
                    // simply set to true coz we don't want repeated call when there is failure
                    setNextDataAvailable(() => true);
                });
        }
    }, [dataAvailable, nextDataAvailable, setNextDataAvailable]);

    useEffect(() => {
        if (!dataAvailable) {
            axios.get(url)
                .then(res => {
                    console.log('completed');
                    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX+url, "1");
                    setDataAvailable(() => true);
                })
                .catch(error => {
                    console.log("error = " + error);
                    let errorMsg = error;
                    if (error.response) {
                        console.log(error.response.data);
                        if (error.response.data.error) {
                            errorMsg = error.response.data.error;
                        }
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        console.log(errorMsg);
                    }
                    setDataAvailable(() => false);
                }).finally(() => {
                    console.log('finally called')
                }
            );
        }
    }, [dataAvailable, setDataAvailable]);


    if (dataAvailable) {
        // let localStorageUrl = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX+url));
        return (<img src={url} className={clzName}/>);
    }
    else {
        return (
            <div className={clzName}>
                <img src={'../../../circular-loader.gif'} className={classes.loader}/>
            </div>
        );
    }
}
