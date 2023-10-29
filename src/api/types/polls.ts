interface Header {
    status: string,
    code: "0000" | "9999",
    message: string
}

interface Body {
    msg: string
}

export interface CommonResponse {
    header: Header,
    body: Body
}

interface CommentResBody extends Body {
    count: number
}

// 使用交叉类型进行接口混入
type Mixin<T, X> = T & X;

type MixinBaseBody<T> = Mixin<Body, T>;


export interface CommentResponse {
    header: Header;
    body: MixinBaseBody<CommentResBody>;
}