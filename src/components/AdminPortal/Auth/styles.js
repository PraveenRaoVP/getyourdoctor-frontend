import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  }));
  
export default useStyles;