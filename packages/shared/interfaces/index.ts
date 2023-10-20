
import { ResponseProps } from './common';
import { ReadAccountResponseProps } from './account';
import { AuthResponseProps, LoginProps, SignUpProps, TokenResponseProps, VerifyTokenProps } from './auth';
import { AllFriendsRequestProps, FriendRequestProps } from './friend';
import { GradeProps, GradebookProps, SubjectProps } from './gradebook';
import NoteProps, { CreateNoteRequestProps, CreateNoteResponseProps, ReadAllNotesResponseProps, ReadNoteResponseProps, UpdateNoteRequestProps, UpdateNoteResponseProps, DeleteNoteResponseProps } from './note';

export type {
  ReadAccountResponseProps,
  AuthResponseProps,
  LoginProps,
  SignUpProps,
  TokenResponseProps,
  VerifyTokenProps,
  FriendRequestProps,
  AllFriendsRequestProps,
  GradeProps,
  GradebookProps,
  SubjectProps,
  CreateNoteRequestProps,
  CreateNoteResponseProps,
  ReadAllNotesResponseProps,
  ReadNoteResponseProps,
  UpdateNoteRequestProps,
  UpdateNoteResponseProps,
  DeleteNoteResponseProps,
  NoteProps,
}
export default ResponseProps;
