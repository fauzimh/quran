import React, {useEffect, useState} from "react";
import axios from 'axios';

export default function Page({url, nextUrl, clzName}) {
    const [dataAvailable, setDataAvailable] = useState(false);
    const [nextDataAvailable, setNextDataAvailable] = useState(false);

    useEffect(()=>{
        if (dataAvailable && !nextDataAvailable && nextUrl) {
            console.log("getting nextUrl:" + nextUrl);
            axios.get(nextUrl)
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
        return (<img src={url} className={clzName}/>);
    }
    else {
        return (
            <div className={clzName}>
                <img src={'../../../Infinity-1s-200px.gif'}/>
            </div>
        );
    }
}
