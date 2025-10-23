import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
 
export default function PasswordReset({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <div className="display-flex flex-col items-center justify-center w-100 h-100 bg-gray-50 p-8 rounded-lg shadow-md">
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Verify your Email</h1>
          <p className="text-sm text-muted-foreground mt-5">
            Please enter your email address to reset your password. We will send you a link to create a new password via email.
          </p>
          <Button
            type="submit"
            className="w-full  bg-blue-600 hover:bg-blue-700 mt-10"
          >
            Verify Email
          </Button>
        </div>
      </form>
    </div>
  );
}
