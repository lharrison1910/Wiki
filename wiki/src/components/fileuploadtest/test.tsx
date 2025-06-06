import { Button, styled } from "@mui/material"
import { useState, } from "react"

function FileUpload(){
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });


    const [selectedFile, setSelectedFile] = useState(null)

    function fileChange(event: any){
        setSelectedFile(event.target.files[0])
    }
    console.log(selectedFile)


    return (
        <>
            <div>
                <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                    >
                    upload file
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => fileChange(event)}
                    />
                </Button>
            </div>
        </>
    )
}

export default FileUpload