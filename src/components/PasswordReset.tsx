import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 
export function PasswordReset({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <div className="display-flex flex-col items-center justify-center w-100 h-100 bg-gray-50 p-8 rounded-lg shadow-md">
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" 
                   type= "password"
                   required
                    />  
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Confirm Password</Label>
            </div>
            <Input id="confirm password" type="password" required />
          </div>
          <Button
            type="submit"
            className="w-full  bg-blue-600 hover:bg-blue-700"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}
