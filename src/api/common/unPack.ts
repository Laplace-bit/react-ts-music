/**
===================================================================
@description common unpack
@author dzlin
===================================================================
*/

interface response {
    header: object,
    body: object
}

export function unPack({ header, body }: response) {

}

/**  */
function isTransSuccess(code: string) {
    return code === "0000";
}

