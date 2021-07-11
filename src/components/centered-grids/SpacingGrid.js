import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Redirect, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 968,
        width: 700
    },
}));

const MIN_PAGE = 1;
const MAX_PAGE = 604;
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

function getCorrectPage(page) {
    // if 1 or 2, return 1
    // if 3 or 4, return 3
    // if 5 or 6, return 5
    if (!page) {
        return MIN_PAGE;// return 1st page
    }
    let correctPage = Number(page);
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
    // offset page by 1
    return Number(page) + 1;
}

function getImageUrl(page, leftRight) {
    let thePage = leftRight === LEFT ? (Number(page) + 1) : page;
    return '../../../images/' + thePage + '.png'
}

export default function SpacingGrid() {
    const classes = useStyles();

    const search = useLocation().search;
    const page = new URLSearchParams(search).get("page");
    // console.log('page=' + page);
    const correctPage = getCorrectPage(page);
    // console.log('correctPage=' + correctPage);
    const normalizedPage = normalizePage(correctPage);

    // console.log('LEFT=' + getImageUrl(normalizedPage, LEFT));
    // console.log('RIGHT=' + getImageUrl(normalizedPage, RIGHT));

    useEffect(() => {

    }, []);

    return (
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={0} direction='row-reverse'>
                    <Grid item>
                        <img src={getImageUrl(normalizedPage, RIGHT)} className={classes.paper}/>
                    </Grid>
                    <Grid item>
                        <img src={getImageUrl(normalizedPage, LEFT)} className={classes.paper}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
