// https://www.kobic.re.kr/rdap/project/download/4c523d02-ba9d-45cb-ae9d-59e484433cb7/single/hisat2-stringtie/hg19/0000-x1/qc
	@SuppressWarnings({ "deprecation", "unchecked" })
	@RequestMapping(value = "/project/download/{assignmentKey}/{p_id}/{pipeline}/{gene}/{sampleName}/{condition}",
		method = { RequestMethod.GET })
	public void mappingDownloadQcLink(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("assignmentKey") String assignmentKey,
			@PathVariable("p_id") String p_id,
			@PathVariable("pipeline") String pipeline,
			@PathVariable("gene") String gene,
			@PathVariable("sampleName") String sampleName,
			@PathVariable("condition") String condition) throws Exception {
		
			logger.info(assignmentKey);
			logger.info(p_id);
			String outputPath = "/BiO/rdap/project/"+assignmentKey+"/"+p_id+"/"+pipeline+"/"+gene+"/output/";
			logger.info(outputPath);
			
			response.setContentType("application/octet-stream");
	        response.setHeader("Content-Disposition", "attachment;filename="+sampleName+".zip");
	        response.setStatus(HttpServletResponse.SC_OK);
	        
			ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream());
			
			switch(condition) {
			case "qc":
				outputPath = outputPath+"01.fastqc/"+sampleName;
				File dir = new File(outputPath);
				String[] fileNames = dir.list((f,name)->name.endsWith(".zip")); // *.zip파일이름을 배열에 저장
				ArrayList<File> targetFiles = new ArrayList<>(fileNames.length);
				
				for(String file : fileNames) {
					logger.info("Target :: {}",file);
					targetFiles.add(new File(outputPath+"/"+file));
				}
				
		        
		        for (File file : targetFiles) {
		            //new zip entry and copying inputstream with file to zipOutputStream, after all closing streams
		            zipOutputStream.putNextEntry(new ZipEntry(file.getName()));
		            FileInputStream fileInputStream = new FileInputStream(file);

		            IOUtils.copy(fileInputStream, zipOutputStream);

		            fileInputStream.close();
		            zipOutputStream.closeEntry();
		        }   
		       zipOutputStream.close();
				break;
			default:
				return ;
			}
	}
