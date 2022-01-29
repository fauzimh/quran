import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from "@material-ui/core/Typography/Typography";
import surahData from "../../data/surah.json";

const useStyles = makeStyles({
    list: {
        width: 170,
    },
    listitem: {
        "&:hover": {
            border: "1px dashed green",
            color: "green"
        },
    }
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List dense >
                {surahData.map((e, index) => (
                    <ListItem button key={index} component="a" href={'?page='+e.pageNumber} className={classes.listitem}>
                        <Typography variant="primary">
                            {e.suratName}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    let anchor = 'right';
    return (
        <div>
            <React.Fragment key={anchor}>
                <Button size='small' variant="contained" fullWidth color="secondary"
                        onClick={toggleDrawer(anchor, true)}>Surat List</Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
