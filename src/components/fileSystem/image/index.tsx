import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Image as UiImage } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { upload, getImagesList } from '@/api/fileRequest';
import { imagesList } from '@/api/apiConstant'
import { usePointerPosition } from '@/hooks/usePointerPosition';
import Draggable from 'react-draggable';
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const Image: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([

    ]);
    const { x, y } = usePointerPosition()
    console.log("x=" + x, "y=" + y)
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    // 上传请求
    const handleUpload = async (options: any) => {
        const { onSuccess, onError, file } = options;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('enctype', 'multipart/form-data');
        try {
            const response = await upload(formData);
            if (response.errno !== -1) {
                // 上传成功的处理
                window.$messageApi.open({
                    type: 'success',
                    content: "File uploaded successfully",
                });
                onSuccess(response.data, file);
                return;
            }
            window.$messageApi.open({
                type: 'error',
                content: "File upload failed",
            });
            onError(response.msg);
        } catch (error) {
            // 上传失败的处理
            window.$messageApi.open({
                type: 'error',
                content: "File upload failed",
            });
            onError(error);
        }
    };
    const [imageList, setImageList] = useState<imagesList[]>([])
    useEffect(() => {
        // 创建一个内部的异步函数
        async function getData() {
            try {
                // 使用 await 来等待异步操作完成
                const { data = [], errno, msg } = await getImagesList();
                if (errno === 0) {
                    setImageList(data);
                    return;
                }
                window.$messageApi.open({
                    type: 'error',
                    content: msg,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData()
    }, [])

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                customRequest={handleUpload}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            {
                imageList.map(item => (
                    <Draggable>
                        <UiImage
                            width={200}
                            src={'http://localhost:3300/file/images/' + item.imgName}
                            preview={{
                                visible: false,
                                mask: <>111</>
                                // src: 'http://localhost:3300/file/images/' + item.imgName,
                            }}
                        />
                    </Draggable>
                ))
            }

        </>
    );
};

export default Image;