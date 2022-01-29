import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useLocation} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup/ButtonGroup";
import Button from "@material-ui/core/Button/Button";
import TemporaryDrawer from "./TemporaryDrawer";
import { createBrowserHistory } from 'history';
import Page from "./Page";

const MIN_PAGE = 1;
const MAX_PAGE = 604;
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const history = createBrowserHistory();

function getCorrectPage(page) {
    // if 1 or 2, return 1
    // if 3 or 4, return 3
    // if 5 or 6, return 5
    if (!page) {
        return MIN_PAGE;// return 1st page
    }
    let correctPage = Number(page);
    if(correctPage < MIN_PAGE){
        correctPage = MIN_PAGE;
    }
    if (correctPage > MAX_PAGE) {
        correctPage = MAX_PAGE;
    }
    if (correctPage % 2 === 0) {
        return Number(correctPage) - 1;
    }
    return correctPage;
}

function normalizePage(page) {
    // coz first page is page 2, so need to add 1
    return Number(page) + 1;
}

function getImageUrl(page, leftRight) {
    let thePage = leftRight === LEFT ? (Number(page) + 1) : page;
    return '../../../images/' + thePage + '.png'
}

function getNextPage(correctPage){
    return Number(getCorrectPage(correctPage+2));
}

function getNextPageUrl(correctPage, cache_val){
    let url = '?page='+getNextPage(correctPage);
    if(cache_val){
        url+="&cache="+cache_val;
    }
    return url;
}

function getPrevPage(correctPage){
    return Number(getCorrectPage(correctPage-2));
}

function getPrevPageUrl(correctPage, cache_val){
    let url = '?page='+getPrevPage(correctPage);
    if(cache_val){
        url+="&cache="+cache_val;
    }
    return url;
}


function findHeightFromWidth(width){
    return 968*width/700;
}

export default function SpacingGrid(props) {

    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();

    const [width, setWidth] = useState(700);
    const [height, setHeight] = useState(968);

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowWidth(()=>window.innerWidth);
            setWindowHeight(()=>window.innerHeight);
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    useEffect(()=>{
        if(windowWidth<width){
            setWidth(()=>windowWidth*11/12); // use 11 out of 12 grid for quran page
        }
        setHeight(()=> findHeightFromWidth(width));
    }, [windowWidth, width, setHeight, setWidth]);

    // console.log('width='+width+' height='+height);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            margin: 'auto',
            marginTop: '5px',
            marginBottom: '15px',
            width: width*2.2,
        },
        drawer: {
            marginLeft: '-70px',
        },
        read: {
            marginBottom: '5px',
            // width: width*2,
        },
        page: {
            height: height,
            width: width
        },
        button: {

        }
    }));

    const classes = useStyles();

    const search = useLocation().search;
    const page = new URLSearchParams(search).get("page");
    const cache = new URLSearchParams(search).get("cache");
    const correctPage = getCorrectPage(page);
    const normalizedPage = normalizePage(correctPage);

    function downHandler({ key }) {
        if (key === "ArrowLeft") {
            console.log('left arrow pressed');
            history.push(getNextPageUrl(correctPage));
            history.go();
        }
        else if (key === "ArrowRight") {
            console.log('right arrow pressed');
            history.push(getPrevPageUrl(correctPage));
            history.go();
        }
    }
    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    if(!windowWidth){
        return <div><p>loading...</p></div>
    }

    let nextUrl = getNextPageUrl(correctPage, "no");
    let prevUrl = getPrevPageUrl(correctPage, "no");
    if(cache==="no"){
        nextUrl = null;
        prevUrl = null;
    }

    return (
        <Grid container className={classes.root} spacing={0} justifyContent="center" direction='row'>
            <Grid item xs={11}>
                <Grid container justifyContent="center" spacing={0} direction='row-reverse' className={classes.read}>
                    <Paper elevation={3}>
                        <Page url={getImageUrl(normalizedPage, RIGHT)}
                              nextUrl={prevUrl}
                              clzName={classes.page} />
                    </Paper>
                    <Paper elevation={3}>
                        <Page url={getImageUrl(normalizedPage, LEFT)}
                              nextUrl={nextUrl}
                              clzName={classes.page} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={1} className={classes.drawer}>
                <TemporaryDrawer/>
            </Grid>
            <Grid item xs={11}>
                <Grid container justifyContent="center" spacing={2} direction='row-reverse'>
                    <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group" >
                        <Button size='small' href={getNextPageUrl(correctPage)} className={classes.button}> Next </Button>
                        <Button size='small' href={getPrevPageUrl(correctPage)} className={classes.button}> Prev </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Grid item xs={1} className={classes.drawer}/>
        </Grid>
    );
}
