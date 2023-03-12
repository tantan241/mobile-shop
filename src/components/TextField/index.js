import TextField from '@mui/material/TextField';
function TextFieldTan(props) {
    const { fontSize } = props;
    const fontSizeTF = fontSize || '10px';
    return (
        <TextField
            variant="outlined"
            InputProps={{ style: { fontSize: fontSizeTF } }}
            InputLabelProps={{ style: { fontSize: fontSizeTF } }}
            {...props}
        ></TextField>
    );
}
export default TextFieldTan;
