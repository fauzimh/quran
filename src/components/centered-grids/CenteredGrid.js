import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center'
    },
}));

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={2} alignContent='flex-start' alignItems='flex-start'>
                <Grid item xs={6} alignContent='flex-end' alignItems='flex-end'>
                    <img src={require('../../images/5.png').default}/>

                </Grid>
                <Grid item xs={6} alignContent='flex-start' alignItems='flex-start'>
                    <img src={require('../../images/4.png').default}/>
                    {/*<Paper className={classes.paper}>xs=6</Paper>*/}
                </Grid>
            </Grid>
        </div>
    );
}
