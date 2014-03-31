module SessionsHelper
  def require_login!
    redirect_to new_session_url unless logged_in?
  end


end
