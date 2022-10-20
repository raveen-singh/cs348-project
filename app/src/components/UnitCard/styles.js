import { makeStyles } from '@mui/styles';

export default makeStyles({
  media: {
    display: 'block',
    height: '100%',
    width: '100%',
    maxWidth: '50%',
    maxHeight: '50%',
    margin: 'auto',
    backgroundSize: 'contain'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fff'
  },
  overlay: {
    position: 'absolute',
    top: '30px',
    left: '20px',
    color: 'black',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    padding: '30px auto',
    color: 'black',
    textAlign: 'justify',
    maxHeight: '100%',  
    overflowY: 'scroll',
    scrollbarWidth: "none",
    '&::-webkit-scrollbar':{
        display: 'none'
    }
  },
  title: {
    padding: '0 16px',
    'text-align': 'center',
    margin: '15px auto'
  },
  cardActions: {
    padding: '30px auto',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px'
  },
});