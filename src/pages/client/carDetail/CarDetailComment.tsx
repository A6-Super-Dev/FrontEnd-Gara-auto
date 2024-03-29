import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import clientService from '../../../services/clientService';
import { ClientDetailAttributes } from '../../../reduxToolKit-Saga/common/User/ClientSlice';

import Comment from './Comment';

export type CommentReaction = {
  carId: number;
  commentId: number;
  dislike: number;
  id: number | string;
  like: number;
  userId: number;
};
export function broofa() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const CarDetailComment: React.FC<{
  userStatus: string;
  carInfo: any;
  userInfo: ClientDetailAttributes;
  carComments: any;
  setCarComments: any;
  commentReactions: Array<CommentReaction>;
  setCommentReactions: any;
  params: any;
}> = ({
  userStatus,
  carInfo,
  userInfo,
  carComments,
  setCarComments,
  commentReactions,
  setCommentReactions,
  params,
}) => {
  const [comment, setComment] = useState<any>(undefined);
  const [sendingComment, setSendingComment] = useState(false);
  const navigate = useNavigate();
  const commentRef = useRef<any>(null);
  const unauthorized = userStatus === 'Unauthorized';

  const onCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const keyDown = async (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      setSendingComment(true);
      const newComment = (
        await clientService.postComment({
          carId: carInfo.id,
          comment,
          mom: '',
          userId: userInfo.id,
        })
      ).data.newCreatedComment;
      setCarComments((carComments: Array<any>) => {
        return [newComment, ...carComments];
      });

      setComment(() => '');
      commentRef.current.blur();
      commentRef.current.value = '';
      setSendingComment(false);
    }
  };

  const findCurrUserReactedComment = (commentId: number) => {
    let comment;
    const reactedComment = commentReactions.filter((reaction: CommentReaction) => {
      return reaction.commentId === commentId && reaction.userId === userInfo.id;
    });
    if (reactedComment.length > 0) {
      comment = reactedComment[0];
      return comment;
    } else {
      return undefined;
    }
  };

  const resetReactionComments = (reactedComment: CommentReaction) => {
    setCommentReactions((reactions: Array<CommentReaction>) => {
      reactions = reactions.map((reaction: CommentReaction) => {
        if (reaction.commentId === reactedComment?.commentId && reaction.userId === reactedComment.userId) {
          return reactedComment;
        } else {
          return reaction;
        }
      });

      return reactions;
    });
  };

  const filterNonReactedComment = (reactedComment: CommentReaction) => {
    setCommentReactions((reactions: Array<CommentReaction>) => {
      return [...reactions, reactedComment] as Array<CommentReaction>;
    });
  };

  const likeComment = async (commentId: number) => {
    if (userStatus === 'Unauthorized') {
      navigate('/auth/user/log-in');
      return;
    }

    let reactedComment: CommentReaction | undefined = findCurrUserReactedComment(commentId);
    if (reactedComment) {
      if (reactedComment.like === 1) {
        reactedComment.like = 0;
      } else {
        reactedComment.like = 1;
        reactedComment.dislike = 0;
      }
      await clientService.updateCommentReaction(reactedComment);
      resetReactionComments(reactedComment);
    } else {
      reactedComment = {
        carId: params.id,
        commentId: commentId,
        dislike: 0,
        id: broofa(),
        like: 1,
        userId: userInfo.id,
      };
      await clientService.reactToComment(reactedComment);
      filterNonReactedComment(reactedComment);
    }
  };

  const dislikeComment = async (commentId: number) => {
    if (userStatus === 'Unauthorized') {
      navigate('/auth/user/log-in');
      return;
    }

    let reactedComment: CommentReaction | undefined = findCurrUserReactedComment(commentId);
    if (reactedComment) {
      if (reactedComment.dislike === 1) {
        reactedComment.dislike = 0;
      } else {
        reactedComment.like = 0;
        reactedComment.dislike = 1;
      }
      await clientService.updateCommentReaction(reactedComment);
      resetReactionComments(reactedComment);
    } else {
      reactedComment = {
        carId: params.id,
        commentId: commentId,
        dislike: 1,
        id: broofa(),
        like: 0,
        userId: userInfo.id,
      };
      await clientService.reactToComment(reactedComment);
      filterNonReactedComment(reactedComment);
    }
  };

  useEffect(() => {
    const resetComment = () => {
      const obj1: any = {};
      const obj2: any = {};
      const obj3: any = {};

      if (commentReactions.length > 0) {
        commentReactions.forEach((element: CommentReaction) => {
          if (!obj1[element.commentId] && element.like === 1) {
            obj1[element.commentId] = 1;
          } else if (element.like === 1) {
            obj1[element.commentId]++;
          }
        });
      }
      if (commentReactions.length > 0) {
        commentReactions.forEach((element: CommentReaction) => {
          if (!obj2[element.commentId] && element.dislike === 1) {
            obj2[element.commentId] = 1;
          } else if (element.dislike === 1) {
            obj2[element.commentId]++;
          }
        });
      }

      const currUserReactions = commentReactions.filter((comment: CommentReaction) => {
        return comment.userId === userInfo.id;
      });

      currUserReactions.forEach((reaction: CommentReaction) => {
        if (reaction.like === 1) {
          obj3[reaction.commentId] = 'like';
        } else if (reaction.dislike === 1) {
          obj3[reaction.commentId] = 'dislike';
        } else {
          obj3[reaction.commentId] = 'none';
        }
      });

      let tempComments = carComments;
      tempComments = tempComments.map((comment: CommentReaction) => {
        return {
          ...comment,
          like: obj1[comment.id] || 0,
          dislike: obj2[comment.id] || 0,
          status: obj3[comment.id],
        };
      });
      tempComments = tempComments.sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setCarComments(tempComments);
    };
    resetComment();
  }, [commentReactions, setCarComments, userInfo?.id]);

  console.log('carComments', carComments);

  return (
    <>
      <Container maxWidth="md" className="car-comments">
        <TextField
          label={unauthorized ? 'Please log in to comment' : 'Bình luận'}
          multiline
          rows={4}
          fullWidth
          InputLabelProps={{ style: { fontSize: 18 } }}
          onChange={onCommentChange}
          onKeyDown={keyDown}
          className="writing-comment-area"
          value={comment}
          inputRef={commentRef}
          disabled={sendingComment || userStatus === 'Unauthorized'}
        />
        <Box className="comments-area">
          {carComments.map((comment: any, idx: number) => {
            return (
              <Comment
                key={idx}
                idx={idx}
                comment={comment}
                likeComment={likeComment}
                dislikeComment={dislikeComment}
                carInfo={carInfo}
                userInfo={userInfo}
                setCarComments={setCarComments}
                unauthorized={unauthorized}
              />
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default React.memo(CarDetailComment);
