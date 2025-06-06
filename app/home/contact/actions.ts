'use server';

import mailSender from '@/lib/mail-sender';
import z from 'zod';

export async function sendContactMail(
  prevState: Object | undefined,
  formData: FormData,
) {
  try {
    const parsedData = z
        .object({ from: z.string().email(), message: z.string().min(4) })
        .safeParse({
            from: formData.get('from'),
            message: formData.get('message'),
        });
     
    if (parsedData.success) {
        const { from, message } = parsedData.data;
        await mailSender({from: from, message: message})
    }

    return {success: true, message:'Message successfully sent !'};
     
  } catch (error) {
    return {success: true, message:'Something went wrong.'};
  }
}