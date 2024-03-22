package com.drawingApp.DoodleFlipper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class controller 

{
   @GetMapping("/")
   
    public String homePage(Model Model) 
   {
   return("<H1>Hello World</H1>");
   } 
}
