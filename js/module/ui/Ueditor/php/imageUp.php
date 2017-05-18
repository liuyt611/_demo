<?php
    header("Content-Type:text/html;charset=utf-8");
    error_reporting( E_ERROR | E_WARNING );
    date_default_timezone_set("Asia/chongqing");
    include "Uploader.class.php";

    //上传配置

      $config = array(
          "savePath" => "../../../../uploads/activityimg" ,    //存储文件夹
          "maxSize" => 5000 ,                   //允许的文件最大尺寸，单位KB
          "allowFiles" => array( ".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp" )  //允许的文件格式
      );


    //背景保存在临时目录中
    $up = new Uploader( "upfile" , $config );
    $type = $_REQUEST['type'];
    $callback=$_GET['callback'];

    $info = $up->getFileInfo();

	if( $_SERVER['SERVER_ADDR']!='127.0.0.1' && $_SERVER['REMOTE_ADDR']!='127.0.0.1' )
	{
		 $info['url'] = 'http://p.hd.bitauto.com/'.strstr($info['url'],'activityimg');
        // $info['url'] = 'http://hda.test.hd.bitauto.com/uploads/'.strstr($info['url'],'activityimg');  //测试地址
	}
	/**
     * 返回数据
     */
    if($callback) {
        echo '<script>'.$callback.'('.json_encode($info).')</script>';
    } else {
        echo json_encode($info);
    }
