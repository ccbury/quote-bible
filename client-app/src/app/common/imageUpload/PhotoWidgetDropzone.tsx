import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props {
    setFiles: (files: object[]) => void;
}

export default function PhotoWidgetDropzone({ setFiles }: Props) {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        height: 200
    }
    const dzActive = {
        borderColor: 'green'
    }
    const onDrop = useCallback((acceptedFiles: object[]) => {
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
            preview: URL.createObjectURL(file as MediaSource)
        })))
    }, [ setFiles ])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive, textAlign: 'center' } : { ...dzStyles, textAlign: 'center', }}>
            <input {...getInputProps()} />
            <Icon name='upload' size='huge' />
            <Header content="Add an Image here..." />
        </div>
    )
}