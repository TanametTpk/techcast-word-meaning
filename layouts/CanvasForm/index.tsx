import React, { useRef } from 'react';
import Canvas from '../../components/Canvas';
import { TextField, Card, CardContent, Select, MenuItem, Grid, Divider, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { DownloadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Checkbox, Button } from 'antd';
import useModal from '../../hooks/useModal';

const CanvasLayout = () => {
    const canvas = useRef<HTMLCanvasElement>(null)

    const formik = useFormik({
        initialValues: {
            word: '',
            type: 'วลี',
            meaning: '',
            isWantCredit: false,
            isDarkTheme: true,
            ref: {
                social: 'facebook',
                name: ''
            }
        },
        validationSchema: Yup.object({
            word: Yup.string()
                .required('ใส่คำศัพท์หน่อยโว้ยยยย'),
            type: Yup.string()
                .required('คุณลืมใส่ประเภทของคำป่าวววว'),
            meaning: Yup.string()
                .required('ใส่ความหมายด้วยยยยย'),
            isWantCredit: Yup.boolean(),
            isDarkTheme: Yup.boolean(),
            ref: Yup.object().when("isWantCredit", {
                is: true,
                then: Yup.object({
                    social: Yup.string(),
                    name: Yup.string()
                        .required("ใส่ชื่อด้วยเดี๋ยว ref ไม่ถูก")
                })
            })
        }),
        onSubmit: () => {
            let link = document.getElementById('link');
            link.setAttribute('download', 'meaning.png');
            link.setAttribute('href', canvas.current.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            link.click();
            openAlert();
            formik.resetForm();
        }
    });

    const [isSuccessAlertOpen , openAlert, closeAlert] = useModal(false)

    return (
        <div
            style={{
                display:"flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%"
            }}
        >
            <Snackbar
                open={isSuccessAlertOpen}
                autoHideDuration={6000}
                onClose={() => closeAlert()}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => closeAlert()}
                    severity="success"
                >
                    ภาพได้สร้างเสร็จเรียบร้อยแล้ว
                </MuiAlert>
            </Snackbar>

            <Canvas
                size={500}
                word={formik.values.word}
                type={formik.values.type}
                meaning={formik.values.meaning}
                theme={formik.values.isDarkTheme ? 'dark' : 'light'}
                font="Mitr"
                author={
                    formik.values.isWantCredit ?
                        formik.values.ref?.name
                    :
                        undefined
                }
                canvas={canvas}
            />

            <Card style={{minWidth: "360px", maxWidth: "750px"}} >
                <CardContent>
                    <h1
                        style={{
                            margin: 0,
                        }}
                    >
                        สร้างคำศัพท์
                    </h1>
                    <span>กรอกข้อมูลเพื่อสร้างนิยามใหม่ให้กับคำศัพท์</span>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12}>
                            <TextField
                                label="คำศัพท์"
                                multiline
                                rowsMax={4}
                                name="word"
                                value={formik.values.word}
                                onChange={formik.handleChange}
                                variant="outlined"
                                style={{width:"100%"}}
                                error={formik.errors.word && formik.touched.word ? true : false}
                                helperText={formik.errors.word && formik.touched.word ? formik.errors.word : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                label="ประเภท"
                                variant="outlined"
                                style={{width:"100%"}}
                            >
                                <MenuItem value={"วลี"}>วลี</MenuItem>
                                <MenuItem value={"น."}>นาม</MenuItem>
                                <MenuItem value={"กริยา"}>กริยา</MenuItem>
                                <MenuItem value={"กรรม"}>กรรม</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="ความหมาย"
                                multiline
                                rows={3}
                                rowsMax={4}
                                name="meaning"
                                value={formik.values.meaning}
                                onChange={formik.handleChange}
                                variant="outlined"
                                style={{width:"100%"}}
                                error={formik.errors.meaning && formik.touched.meaning ? true : false}
                                helperText={formik.errors.meaning && formik.touched.meaning ? formik.errors.meaning : ""}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <h1
                                style={{
                                    margin: 0,
                                }}
                            >
                                settings เพิ่มเติม
                            </h1>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: "1fr",
                                    gridGap: "12px",
                                    margin: "0 0 12px 0"
                                }}
                            >
                                <Checkbox
                                    name="isDarkTheme"
                                    onChange={formik.handleChange}
                                    checked={formik.values.isDarkTheme}
                                    style={{margin: 0}}
                                >
                                    ใช้ dark theme
                                </Checkbox>
                                <Checkbox
                                    name="isWantCredit"
                                    onChange={formik.handleChange}
                                    checked={formik.values.isWantCredit}
                                    style={{margin: 0}}
                                >
                                    ฉันต้องการได้ credit
                                </Checkbox>
                            </div>
                            <Grid container alignItems="stretch" justify="center" spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="ใส่ชื่อ facebook ของคุณที่นี้"
                                        multiline
                                        rowsMax={4}
                                        name="ref.name"
                                        disabled={!formik.values.isWantCredit}
                                        value={formik.values.ref.name}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        style={{
                                            width:"100%",
                                        }}
                                        error={
                                            formik.errors.ref?.name &&
                                            formik.touched.ref?.name
                                             ? true : false
                                        }
                                        helperText={
                                            formik.errors.ref?.name &&
                                            formik.touched.ref?.name
                                            ? formik.errors.ref?.name :
                                            ""
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                id="btn-float-left"
                                type="primary"
                                icon={<DownloadOutlined />}
                                size='large'
                                onClick={() => formik.handleSubmit()}
                            >
                                Download
                            </Button>
                            <a id="link" style={{display:"hidden"}}></a>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default CanvasLayout