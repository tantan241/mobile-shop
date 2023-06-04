import { Grid } from '@mui/material';

function Contact() {
    const info = [
        { key: 'Họ và tên chủ cửa hàng', value: 'Vũ Viết Tân' },
        { key: 'Email', value: 'vuviettan2401@gmail.com' },
        { key: 'Facebook', value: 'vuviettan2401@gmail.com' },
        {
            key: 'Địa chỉ cửa hang',
            value: 'Số nhà 100, Đường Xuân Phương, Phường Xuân Phương, Quận Nam Từ Liêm, Hà Nội',
        },
        { key: 'Thời gian mở cửa', value: '7:00 AM - 9:00PM' },
    ];
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            margin: '10px 0',
                        }}
                    >
                        <h2>Thông tin liên hệ</h2>
                    </div>
                </Grid>
                {info.map((it) => (
                    <Grid
                        item
                        xs={12}
                        style={{ fontSize: '2rem', borderBottom: '1px solid rgba(0,0,0,0.2)', padding: '20px 0' }}
                    >
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                {it.key}
                            </Grid>
                            <Grid item xs={8}>
                                {it.value}
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Contact;
