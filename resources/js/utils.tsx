import Swal from "sweetalert2";

export const getToken = () => {
    return localStorage.getItem('token');
}

export const getHeaders = () => {
    const token = getToken();

    if (!token) {
        return {}
    }

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const apiUrl = (): string => {
    return '/api';
}

export const pleaseWait = (title: string) => {
    Swal.fire({
        title: title ? title : 'Loading Images...',
        text: 'Loading...',
    })
}

export const savingData = (type: string) => {
    Swal.fire({
        showConfirmButton: false,
        title: 'Saving ' + type + ' ...',
        text: '',
    })
}

export const confirmDelete = (url: string, page: any, type: string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this " + type  + ' and all associated data!',
        icon: "warning",
        showCancelButton: true
    }).then((willDelete) => {
        if (willDelete) {
            axios.delete(url)
                .then(res => {
                    page.setState({
                        errors: ''
                    })
                    page.getData()
                }).catch(function (err) {
                page.setState({
                    success: '',
                    errors: err.response.data
                })
            });
        }
    });
}

export const modalStyles = () => {
  return {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '400px',
    }
  }
};
