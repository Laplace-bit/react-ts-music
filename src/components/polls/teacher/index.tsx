import React from 'react';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal } from 'antd';
import "./teacher.less"
import { commitComment } from '@/api/polls';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateTeacherCount } from '@/store/features/polls-slice';
const { Meta } = Card;
interface props {
    openState: boolean,
    setOpenState: Function,
    title: string | undefined,
}

const Teacher: React.FC<props> = (props) => {
    const { openState, setOpenState, title } = props;
    const dispatch = useAppDispatch();
    // get teachers 列表数据
    let list = useAppSelector((state) => state.polls.teachers);

    /**  */
    async function handleLikeOrDislike(no: number, action: string) {
        console.log(no, action)
        const { code, count } = await commitComment(no, action);
        if (code === 20000) {
            dispatch(updateTeacherCount({ no, flag: action, count }))
            console.error({ no, flag: action, count })
        }
    }

    return (
        <Modal
            title={title}
            centered
            open={openState}
            onOk={() => setOpenState(false)}
            onCancel={() => setOpenState(false)}
            width={1000}
        >
            {
                list.map(item =>
                    <Card
                        key={item.no}
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src={require("./img/" + item.photo)}
                            />
                        }
                        actions={[
                            <LikeOutlined onClick={() => handleLikeOrDislike(item.no, 'good')} />,
                            item.good_count.toString(),
                            <DislikeOutlined onClick={() => handleLikeOrDislike(item.no, 'bad')} />,
                            item.bad_count.toString()
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                            title={item.name}
                            description={item.intro}
                        />
                    </Card>
                )
            }

        </Modal>


    );
};

export default Teacher;

