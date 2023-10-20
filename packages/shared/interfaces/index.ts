
import { ResponseProps } from './common';
import { ReadAccountResponseProps } from './account';
import { LoginRequestProps, LoginResponseProps, SignUpRequestProps, SignUpResponseProps, VerifyTokenRequestProps, VerifyTokenResponseProps } from './auth';
import { AllFriendsRequestProps, FriendRequestProps } from './friend';
import { GradeProps, GradebookProps, SubjectProps } from './gradebook';
import NoteProps, { CreateNoteRequestProps, CreateNoteResponseProps, ReadAllNotesResponseProps, ReadNoteResponseProps, UpdateNoteRequestProps, UpdateNoteResponseProps, DeleteNoteResponseProps } from './note';

export type {
  ReadAccountResponseProps,
  LoginRequestProps, LoginResponseProps, SignUpRequestProps, SignUpResponseProps, VerifyTokenRequestProps, VerifyTokenResponseProps,
  FriendRequestProps, AllFriendsRequestProps,
  GradeProps, GradebookProps, SubjectProps,
  CreateNoteRequestProps, CreateNoteResponseProps, ReadAllNotesResponseProps, ReadNoteResponseProps, UpdateNoteRequestProps, UpdateNoteResponseProps, DeleteNoteResponseProps, NoteProps,
}
export default ResponseProps;
