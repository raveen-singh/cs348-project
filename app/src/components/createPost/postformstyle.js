import { makeStyles } from '@mui/styles';

export default makeStyles({
    paper: {
        padding: '2%',
        position: 'absolute',
        top: '25%',
        left: '30%',
        width: '40%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    numbers: {
        width: '20%'
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
        width: '100%',
        height: '10%'
    },
});