package com.example.http;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class HttpDemoController {
    @GetMapping("/session")
    ResponseEntity<String> sessionDemo2(HttpServletRequest request, HttpServletResponse res)
            throws IOException {
        String name = request.getParameter("name");
        if (name != null) {
            request.getSession().setAttribute("name", name);
        } else {
            name = (String) request.getSession().getAttribute("name");
        }
        String response = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<title>Servlet SessionDemo</title>" +
                "</head>" +
                "<body>";
        if (name != null) {
            response += "<p> Welcome " + name + " !</p>";
            response += "<a href='?'> Go Back </a>";
        } else {
            response += "<h2>Please enter your name, and submit</h2>" +
                    "<form action=''>" +
                    "<input type='input' name='name'>" +
                    "<input type='submit'></form>";
        }
        response += "</body>" +
                "</html>";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_HTML);
        return new ResponseEntity<String>(response, headers, HttpStatus.OK);
    }

}
