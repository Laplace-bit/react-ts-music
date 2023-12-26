import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { getSubjects, getTeachers } from '@/api/polls';
import { type subject } from "@/api/urls/apiConstant";
import Teacher from './teacher';
import { useAppDispatch } from '@/store/hooks';
import { updateTeachersList } from '@/store/features/polls-slice';
import withLog from '../HOC/withLog';

const Polls: React.FC = () => {
    const TeacherLog = withLog(Teacher)
    const [subjects, setSubjects] = useState<Array<subject>>([])
    const [openState, setOpenState] = useState(false);
    const [title, setTitle] = useState<string | undefined>("");

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function initSubject() {
            setSubjects((await getSubjects()).results)
            console.error("subjects..", subjects)
        }
        initSubject()
    }, [])

    const onClickSubject = async (no: number) => {
        const { teachers, subject } = await getTeachers(no);
        if (teachers && teachers.length > 0) {
            dispatch(updateTeachersList({ subject, teachers }));
        }
        // setTeachersList(teachers)
        setOpenState(true);
        const { name } = subjects.find(item => item.no === no) || { title: "" };
        setTitle(name);
    }

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={subjects}
                renderItem={(item, index) => (
                    <List.Item onClick={() => onClickSubject(item.no)}>
                        <List.Item.Meta
                            title={item.name}
                        />
                    </List.Item>
                )}
            />
            <TeacherLog openState={openState} setOpenState={setOpenState} title={title}></TeacherLog>
        </div>
    );
};

export default Polls;

