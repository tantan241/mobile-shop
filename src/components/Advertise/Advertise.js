import PropTypes from 'prop-types';
function Advertise({ src, width, height }) {
    return <img style={{ width, height }} alt="Quảng cáo" src={src} />;
}
Advertise.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.node,
    height: PropTypes.node,
};

export default Advertise;
