/**
 * Created by oukeye on 2018/12/8.
 */
function isPoneAvailable(phone) {
    var myreg=/^[1][0-9]{10}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}
export  default isPoneAvailable;
