package com.pt.biscuIT.common.util;

import com.pt.biscuIT.api.dto.member.MemberRefreshToken;
import com.pt.biscuIT.db.repository.MemberRefreshTokenRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private String clientUrl = "http://localhost";
    MemberRefreshTokenRedisRepository memberRefreshTokenRedisRepository;
//    private RequestCache requestCache = new HttpSessionRequestCache();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        // SavedRequestAwareAuthenticationSuccessHandler 로직
//        SavedRequest savedRequest = this.requestCache.getRequest(request, response);
//        if (savedRequest == null) {
//            super.onAuthenticationSuccess(request, response, authentication);
//            return;
//        }
//        String targetUrlParameter = getTargetUrlParameter();
//        if (isAlwaysUseDefaultTargetUrl()
//                || (targetUrlParameter != null && StringUtils.hasText(request.getParameter(targetUrlParameter)))) {
//            this.requestCache.removeRequest(request, response);
//            super.onAuthenticationSuccess(request, response, authentication);
//            return;
//        }
//        clearAuthenticationAttributes(request);
//        // Use the DefaultSavedRequest URL
//        String targetUrl = savedRequest.getRedirectUrl();

//        clientUrl = targetUrl.substring(0, targetUrl.indexOf("/login/oauth2/code/"));
        // 내가 추가한 로직: access token, refresh token 발급
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;

        String accesstoken = JwtTokenUtil.getToken(JwtTokenUtil.ACCESS_TOKEN_NAME, oAuth2AuthenticationToken.getAuthorizedClientRegistrationId() + oAuth2User.getName());
        String refreshtoken = JwtTokenUtil.getToken(JwtTokenUtil.REFRESH_TOKEN_NAME, oAuth2AuthenticationToken.getAuthorizedClientRegistrationId() + oAuth2User.getName());
        MemberRefreshToken memberRefreshToken = new MemberRefreshToken(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId() + oAuth2User.getName(), refreshtoken, JwtTokenUtil.getExpiration(refreshtoken));
//        memberRefreshTokenRedisRepository.save(memberRefreshToken);
        response.addCookie(CookieUtil.createCookie(clientUrl, JwtTokenUtil.ACCESS_TOKEN_NAME, accesstoken));
        response.addCookie(CookieUtil.createCookie(clientUrl, JwtTokenUtil.REFRESH_TOKEN_NAME, refreshtoken));
        getRedirectStrategy().sendRedirect(request, response, clientUrl + ":3000/login/oauth2/redirect");
    }


}