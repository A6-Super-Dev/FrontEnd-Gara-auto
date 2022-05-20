import React, { useState, useRef, useEffect } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, TextField, Avatar, IconButton, Button, Menu, MenuItem } from '@mui/material';

import TimeHelper from '../../../common/helper/time';
import clientService from '../../../services/clientService';
import CustomDialog from '../../../components/Dialog/CustomDialog';

const Comment = ({
  idx,
  comment,
  likeComment,
  dislikeComment,
  unauthorized,
  carInfo,
  userInfo,
  setCarComments,
}: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [updatingComment, setUpdatingComment] = useState(false);
  const [updatingCommentContent, setUpdatingCommentContent] = useState<string>();
  const [sendingComment, setSendingComment] = useState(false);
  const commentRef = useRef<any>(null);
  const [openDeleteCommentDialog, setOpenDeleteCommentDialog] = useState(false);

  useEffect(() => {
    setUpdatingCommentContent(comment.comment);
  }, [comment.comment]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteComment = () => {
    setOpenDeleteCommentDialog(true);
    setAnchorEl(null);
  };

  const handleOnclickUpdate = () => {
    setUpdatingComment(true);
    setAnchorEl(null);
  };

  const keyDown = async (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      setSendingComment(true);
      await clientService.updateComment({
        id: +comment?.id,
        carId: carInfo.id,
        comment: updatingCommentContent || '',
        mom: '',
        userId: userInfo.id,
      });
      setCarComments((carComments: any) => {
        carComments.forEach((element: any, idx: number) => {
          if (element.id === comment.id) {
            carComments[idx].comment = updatingCommentContent;
          }
        });
        return carComments;
      });
      setUpdatingCommentContent(() => '');
      commentRef.current.blur();
      commentRef.current.value = '';
      setUpdatingComment(false);
      setSendingComment(false);
    }
  };

  const onUpdateCommentChange = (e: any) => {
    setUpdatingCommentContent(e.target.value);
    return;
  };

  const calculateTimeDuration = (startTime: any) => {
    const timeDiff = new Date().getTime() - new Date(startTime).getTime();
    return TimeHelper.calDayHourMinutes(timeDiff);
  };

  const onDeleteComent = async () => {
    setCarComments((carComments: Array<any>) => {
      return carComments.filter((element) => {
        return element.id !== comment.id;
      });
    });
    await clientService.deleteComment({ id: comment.id });
    return;
  };

  return (
    <Box key={idx} className={`comment-wrapper ${idx % 2 && 'slight-gray-bg'}`}>
      {!updatingComment && !unauthorized && comment.userId === userInfo.id && (
        <>
          <Box className="more-action">
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon fontSize="large" />
            </IconButton>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleOnclickUpdate}>Chỉnh sửa</MenuItem>
              <MenuItem onClick={handleDeleteComment}>Xóa</MenuItem>
            </Menu>
          </Box>
        </>
      )}
      <Box className="user-avatar">
        <Avatar src={comment.userInfo.info.avatar} alt="" sx={{ width: 56, height: 56 }} />
      </Box>
      <Box className="user-comment">
        {updatingComment ? (
          <>
            <TextField
              label="Sửa bình luận"
              multiline
              fullWidth
              InputLabelProps={{ style: { fontSize: 18 } }}
              variant="standard"
              value={updatingCommentContent}
              onChange={onUpdateCommentChange}
              onKeyDown={keyDown}
              inputRef={commentRef}
              disabled={sendingComment}
            />
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button onClick={() => setUpdatingComment(false)}>Hủy</Button>
            </Box>
          </>
        ) : (
          <>
            <Box className="user-name-time-container">
              <Box className="user-name">
                {comment?.userInfo?.info?.firstName} {comment?.userInfo?.info?.lastName}
              </Box>
              <Box className="time-diff">{calculateTimeDuration(comment.createdAt)}</Box>
            </Box>

            <Box className="comment">{comment?.comment}</Box>
            <Box className="like-dislike-area">
              <Box className="like-area" onClick={() => likeComment(comment.id)}>
                {comment.status === 'like' ? (
                  <>
                    <IconButton>
                      <ThumbUpIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton>
                      <ThumbUpOutlinedIcon />
                    </IconButton>
                  </>
                )}
                &nbsp; {comment.like}
              </Box>
              <Box className="dislike-area" onClick={() => dislikeComment(comment.id)}>
                {comment.status === 'dislike' ? (
                  <>
                    <IconButton>
                      <ThumbDownIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton>
                      <ThumbDownOutlinedIcon />
                    </IconButton>
                  </>
                )}
                &nbsp; {comment.dislike}
              </Box>
            </Box>
          </>
        )}
      </Box>
      <CustomDialog
        open={openDeleteCommentDialog}
        setOpen={setOpenDeleteCommentDialog}
        title={<Box sx={{ color: 'red' }}>Xóa bình luận</Box>}
        content={<Box>Bạn có chắc muốn xóa bình luận này?</Box>}
        agreeText="OK"
        disagreeText="Cancel"
        onAgree={onDeleteComent}
      />
    </Box>
  );
};

export default Comment;
