/**
 * Created by oukeye on 2018/12/8.
 */
function isPoneAvailable(phone) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}
export  default isPoneAvailable;