import { observer } from 'mobx-react-lite'
import { Segment, Header, Comment, Loader } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { formatDistance } from 'date-fns';
import { Howl } from 'howler';
// import postSoundFile from '/assets/sounds/postMessage.mp3'
import messageSoundFile from '/assets/sounds/newMessage.ogg'

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();
    // const postSound = new Howl({
    //     src: [ postSoundFile ],
    //     volume: 0.2,
    //     preload: true,
    //     rate: 2,
    //     html5: true
    // });
    const messageSound = new Howl({
        src: [ messageSoundFile ],
        volume: 0.2,
        preload: true,
        rate: 1.5,
        html5: true
    });
    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }
    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [ commentStore, activityId ]);
    useEffect(() => {
        if (commentStore.playSound === true) {
            { messageSound.play() }
            timeout(1000)
            commentStore.playSound = false;
        }
    }, [ commentStore.playSound ])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='orange'
                style={{ border: 'none' }}>
                <Header>Chat about this quote!</Header>
            </Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}>
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder='Enter a comment here: (Enter to submit)'
                                            rows={2}
                                            {...props.field}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    // { postSound.play() }
                                                    isValid && handleSubmit();
                                                }
                                            }} />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistance(new Date(comment.createdAt), new Date())} ago</div>

                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
            </Segment>
        </>

    )
})