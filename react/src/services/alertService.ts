import swal from "sweetalert";

const alertService = {
    yay: function (text: string = 'Success', close: () => void = () => void (0)): Promise<void> {
        return swal({
            icon: "success",
            title: 'Success!',
            text: text
        }).then(close);
    },
    err: function (text: string = 'Something went wrong', close: () => void = () => void (0)): Promise<void> {
        return swal({
            icon: "error",
            title: 'Uh oh',
            text: text
        }).then(close);
    }
}

export default alertService;