import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWdigetCropper";
import { AnyObject } from "yup";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
    const [ files, setFiles ] = useState<AnyObject[]>([]);
    const [ cropper, setCropper ] = useState<Cropper>()
    const isMobile = window.screen.width <= 768;

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: object & { preview?: string }) => URL.revokeObjectURL(file.preview!));
        }
    }, [ files ])
    return (
        <Grid>
            <Grid.Column width={isMobile ? 16 : 4}>
                <Header sub color='teal' content="Step 1 - Add Photo" />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={isMobile ? 16 : 1} />
            <Grid.Column width={isMobile ? 16 : 4}>
                <Header sub color='teal' content="Step 2 - Resize" />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[ 0 ].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={isMobile ? 16 : 1} />
            <Grid.Column width={isMobile ? 16 : 4}>
                <Header sub color='teal' content="Step 3 - Preview & Upload" />
                {files && files.length > 0 && (
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group widths={1}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disableed={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>
                )}
            </Grid.Column>
        </Grid >
    )
}