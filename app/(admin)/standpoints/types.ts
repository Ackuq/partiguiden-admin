import { z } from 'zod';

export enum FormField {
  Link = 'link',
  Title = 'title',
  Content = 'content',
  UpdateDate = 'updateDate',
  PartyAbbreviation = 'partyAbbreviation',
  SubjectName = 'subjectName',
}

export const zStandpoint = z.object({
  [FormField.Link]: z.string().nonempty(),
  [FormField.Title]: z.string().nonempty(),
  [FormField.Content]: z.array(z.string().nonempty()).default([]),
  [FormField.UpdateDate]: z.string().optional(),
  [FormField.PartyAbbreviation]: z.string().nonempty(),
  [FormField.SubjectName]: z.string().nonempty(),
});
