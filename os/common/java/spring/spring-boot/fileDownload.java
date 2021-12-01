//https://www.kobic.re.kr/rdap/project/download/f8284856-f8fb-4dd7-9d52-25b962faf1f6/def0ca5a-dde2-41b2-8aba-a57482c6620e/star-rsem/hg38/0000-x1/0000-x1_1_fastqc.zip
	@SuppressWarnings({ "deprecation", "unchecked" })
	@RequestMapping(value = "/project/download/{assignmentKey}/{p_id}/{pipeline}/{gene}/{sampleName}/{fileName}",
		method = { RequestMethod.GET })
	public void mappingDownloadQcLink(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("assignmentKey") String assignmentKey,
			@PathVariable("p_id") String p_id,
			@PathVariable("pipeline") String pipeline,
			@PathVariable("gene") String gene,
			@PathVariable("sampleName") String sampleName,
			@PathVariable("fileName") String fileName) throws Exception {
		
			logger.info(assignmentKey);
			logger.info(p_id);
			String outputPath = "/BiO/rdap/project/"+assignmentKey+"/"+p_id+"/"+pipeline+"/"+gene+"/output/";
			logger.info(outputPath);
			
			
	        response.setStatus(HttpServletResponse.SC_OK);
	        
			ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream());
			
	
			outputPath = outputPath+"01.fastqc/"+sampleName;
			File targetFile = new File(outputPath+"/"+fileName);
			
			response.setHeader("Content-Transfer-Encoding", "binary"); 
	        response.setHeader("Content-Disposition", "attachment;filename="+fileName+".zip");
	        response.setHeader("Content-Length", "" + targetFile.length());
	        response.setHeader("Pragma", "no-cache;");
	        response.setHeader("Expires", "-1;");
	        if(!fileName.contains("zip") || !fileName.contains("_fastqc"))
	        	return ;
			try (FileInputStream fis = new FileInputStream(targetFile); OutputStream out = response.getOutputStream();) {
	
		           int readCount = 0;
		           byte[] buffer = new byte[1024];
		           // 파일 읽을 만큼 크기의 buffer를 생성한 후 
		           while ((readCount = fis.read(buffer)) != -1) {
		               out.write(buffer, 0, readCount);
	
		           }
		       } catch (Exception ex) {
		           throw new RuntimeException("file Load Error");
		       }
	}
