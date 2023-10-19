import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type teacher, subject } from "@/store/features/types/pollsType";



const initialTeachersList: TeachersList = {
    subject: {
        no: 0,
        name: "",
    },
    teachers: []
};

interface TeachersList {
    subject: subject
    teachers: teacher[]
}
interface UpdateParams {
    no: number,
    flag: string,
    count: number,
}

const pollsSlice = createSlice({
    name: 'TeachersList',
    initialState: initialTeachersList,
    reducers: {
        updateTeachersList(state, actions: PayloadAction<TeachersList>) {
            state.subject = actions.payload.subject;
            state.teachers = actions.payload.teachers;
        },
        updateTeacherCount(state, actions: PayloadAction<UpdateParams>) {
            state.teachers.map(item => {
                if (item.no === actions.payload.no) {
                    if (actions.payload.flag === "good") {
                        item.good_count = actions.payload.count;
                    } else {
                        item.bad_count = actions.payload.count;
                    }
                }
            })
        }
    }
})

export const { updateTeachersList, updateTeacherCount } = pollsSlice.actions;

export default pollsSlice.reducer;