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


// 使用交叉类型进行接口混入
type Mixin<T, X> = T & X;

type MixinBaseBody<T> = Mixin<Body, T>;

/** 评价返回报文 */
interface CommentResBody extends Body {
    count: number
}
/** 发送验证码返回报文 */
interface SendSmsCodeResBody extends Body {
    code: string
}

export interface CommentResponse {
    header: Header;
    body: MixinBaseBody<CommentResBody>;
}

export interface SendSmsCodeResponse {
    header: Header;
    body: MixinBaseBody<CommentResBody>;
}