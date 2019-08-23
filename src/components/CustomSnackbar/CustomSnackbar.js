import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';

import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import './CustomSnackbar.scss';


export default class CustomSnackbar extends Component {

    constructor(props){
        super(props);
        
    }

    

    render() {


        const variantIcon = {
            success: CheckCircleIcon,
            warning: WarningIcon,
            error: ErrorIcon,
            info: InfoIcon,
          };


        // const useStyles = makeStyles(theme => ({
        //   success: {
        //     backgroundColor: green[600],
        //   },
        //   error: {
        //     backgroundColor: theme.palette.error.dark,
        //   },
        //   info: {
        //     backgroundColor: theme.palette.primary.main,
        //   },
        //   warning: {
        //     backgroundColor: amber[700],
        //   },
        //   icon: {
        //     fontSize: 20,
        //   },
        //   iconVariant: {
        //     opacity: 0.9,
        //     marginRight: theme.spacing(1),
        //   },
        //   message: {
        //     display: 'flex',
        //     alignItems: 'center',
        //   },
        // }));


        // const classes = useStyles();
        const { open, message, onClose, variant, ...other } = this.props;
        const Icon = variantIcon[variant];
        // autoHideDuration={30000}

        return (
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                open={open}
                onClose={onClose}
            >
            <SnackbarContent
                className={clsx(variant, "custom-snackbar-format")}
                aria-describedby="client-snackbar"
                message={
                <span id="client-snackbar" >
                    <Icon className="message-icon" />
                    {message}
                </span>
                }
                action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon  />
                </IconButton>,
                ]}
                {...other}
            />
            </Snackbar>
        )
    }
}

